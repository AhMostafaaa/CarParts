using Bussiness.Interfaces;
using Bussiness.Services;
using Data;
using Data.IRepositories;
using Data.Repositories;

namespace Api.Services
{
    public static partial class ServicesRegistration
    {
        public static void RegisterServicesConfiguration(this IServiceCollection services)
        {
            services.AddScoped<ISessionService, SessionService>();
            services.AddScoped<IPartService, PartService>();
            services.AddScoped<ISellerService, SellerService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ILookupService, LookupService>();
        }

        public static void RegisterRepositoriesConfiguration(this IServiceCollection services)
        {
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IPartRepository, PartRepository>();
            services.AddScoped<ISellerRepository, SellerRepository>();
        }
    }
}
