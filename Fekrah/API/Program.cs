using API.Middlewares;
using Microsoft.EntityFrameworkCore;
using Api.Services;
using IHostingEnvironment = Microsoft.Extensions.Hosting.IHostingEnvironment;
using Data;
using Bussiness.Interfaces;
using Bussiness.Profilers;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxRequestBodySize = 9999999999;
});

builder.Services.AddAutoMapper(cfg => cfg.AddProfile<ApplicationProfile>(), AppDomain.CurrentDomain.GetAssemblies());
builder.RegisterAppReuiredServices();

builder.Services.AddControllers()
.AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

WebApplication app = builder.Build();

IConfiguration Configuration = app.Configuration;
IHostingEnvironment env = (IHostingEnvironment)app.Environment;
app.ConfigureHTTPRequestPipeline(env, Configuration);
app.Run();
