public interface ICategoryService
{
    Task<IEnumerable<CategoryViewModel>> GetAllAsync();
    Task<CategoryViewModel> GetByIdAsync(int id);
    Task AddAsync(CategoryDto dto);
    Task UpdateAsync(int id, CategoryDto dto);
    Task DeleteAsync(int id);
}
