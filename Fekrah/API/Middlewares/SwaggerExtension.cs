namespace API.Middlewares.Middlewares
{
    public static partial class _Pipeline
    {
        public static void Swagger(this WebApplication app)
        {
            app.UseOpenApi();
            app.UseSwaggerUi();

        }
    }
} 
