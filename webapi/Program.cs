using Newtonsoft.Json;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/getProducts", () =>
{
    string json = new WebClient().DownloadString("https://dummyjson.com/products");
    var productList = JsonConvert.DeserializeObject<dynamic>(json).products.ToObject<List<Product>>();

    return productList;
})
.WithName("getProducts")
.WithOpenApi();

app.Run();
record Product()
{
    [JsonProperty("id")]
    public string Id { get; set; }
    [JsonProperty("title")]
    public string Title { get; set; }
    [JsonProperty("images")]
    public string[] Images { get; set; }
    [JsonProperty("description")]
    public string Description { get; set; }
    [JsonProperty("price")]
    public string Price { get; set; }
}
