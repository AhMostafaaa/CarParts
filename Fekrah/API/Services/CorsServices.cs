namespace API.Services
{  
    public static partial class SwaggerServices
    {
        public static string CorsAllowedOriginsPolicyName => "MoiaAllowOrigins";
        public static void AddCorsFromConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllHeaders",
                builder =>
                {
                    if (configuration.GetSection("CustomOrigin:IsAllowAnyOrigin").Value == "1")
                    {
                        builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    }

                    else
                    {
                        builder.WithOrigins(configuration.GetSection("CustomOrigin:CustomOriginUrl").Value)
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    }
                    //.AllowCredentials();
                });
            });
        }

    }
}
