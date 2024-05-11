var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => {
    options.AddPolicy("my-cors", policy => {
        policy.AllowAnyOrigin();
        policy.AllowAnyMethod();
        policy.AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("my-cors");

app.MapGet("/foo", async context =>
{
    var tokens = new List<string> {
    "Well,","yes,","HTML","is","a","hypermedia.","But","there","is","more","to","the",
    "way","the","web","works","than","just","HTML:","HTTP,","the","Hyper","Text","Transfer","Protocol,","is","what","transfers","HTML","from",
    "servers","to","clients,","and","there","are","many","details","and","features","associated","with",
    "it:","caching,","various","headers,","response","codes,","and","so","forth." };

    Random random = new Random();

    foreach (var token in tokens)
    {
        await context.Response.WriteAsync(token + " ");
        await Task.Delay(random.Next(1, 200));
    }
})
.WithName("GetStreamingResponse");

app.Run();