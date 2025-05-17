using Bussiness.Interfaces;
using Bussiness.Services;

namespace Api.Services
{
    public static partial class ServicesRegistration
    {
        public static void RegisterServicesConfiguration(this IServiceCollection services)
        {
            services.AddScoped<IPartService, PartService>();
            services.AddScoped<ISellerService, SellerService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ILookupService, LookupService>();
        }
    }
}
