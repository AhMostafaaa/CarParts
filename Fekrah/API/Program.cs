using API.Middlewares;
using Moia.Services;
using IHostingEnvironment = Microsoft.Extensions.Hosting.IHostingEnvironment;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxRequestBodySize = 9999999999;
});
builder.RegisterAppReuiredServices();

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    });


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

WebApplication app = builder.Build();

IConfiguration Configuration = app.Configuration;
IHostingEnvironment env = (IHostingEnvironment)app.Environment;
app.ConfigureHTTPRequestPipeline(env, Configuration);
app.Run();
