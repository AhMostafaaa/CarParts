using Microsoft.EntityFrameworkCore;

public class CategoryService : ICategoryService
{
    private readonly DatabaseContext _context;

    public CategoryService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CategoryViewModel>> GetAllAsync()
    {
        return await _context.Categories
            .Select(c => new CategoryViewModel
            {
                Id = c.Id,
                Name = c.Name
            }).ToListAsync();
    }

    public async Task<CategoryViewModel> GetByIdAsync(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return null;

        return new CategoryViewModel
        {
            Id = category.Id,
            Name = category.Name
        };
    }

    public async Task AddAsync(CategoryDto dto)
    {
        var category = new Category
        {
            Name = dto.Name
        };

        await _context.Categories.AddAsync(category);
    }

    public async Task UpdateAsync(int id, CategoryDto dto)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return;

        category.Name = dto.Name;
    }

    public async Task DeleteAsync(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return;

        _context.Categories.Remove(category);
    }
}
