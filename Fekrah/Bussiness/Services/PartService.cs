using Microsoft.EntityFrameworkCore;

public class PartService : IPartService
{
    private readonly DatabaseContext _context;

    public PartService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PartViewModel>> GetAllAsync()
    {
        return await _context.Parts
            .Include(p => p.Seller)
            .Include(p => p.Category)
            .Select(p => new PartViewModel
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Condition = p.Condition.ToString(),
                ImageUrl = p.ImageUrl,
                SellerShopName = p.Seller.ShopName,
                CategoryName = p.Category.Name,
                IsSold = p.IsSold
            }).ToListAsync();
    }

    public async Task<PartViewModel> GetByIdAsync(int id)
    {
        var part = await _context.Parts.Include(p => p.Seller).Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
        if (part == null) return null;

        return new PartViewModel
        {
            Id = part.Id,
            Name = part.Name,
            Description = part.Description,
            Price = part.Price,
            Condition = part.Condition.ToString(),
            ImageUrl = part.ImageUrl,
            SellerShopName = part.Seller.ShopName,
            CategoryName = part.Category.Name,
            IsSold = part.IsSold
        };
    }

    public async Task AddAsync(PartDto dto)
    {
        var part = new Part
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Condition = dto.Condition,
            ImageUrl = dto.ImageUrl,
            SellerId = dto.SellerId,
            CategoryId = dto.CategoryId
        };

        await _context.Parts.AddAsync(part);
    }

    public async Task UpdateAsync(int id, PartDto dto)
    {
        var part = await _context.Parts.FindAsync(id);
        if (part == null) return;

        part.Name = dto.Name;
        part.Description = dto.Description;
        part.Price = dto.Price;
        part.Condition = dto.Condition;
        part.ImageUrl = dto.ImageUrl;
        part.CategoryId = dto.CategoryId;
    }

    public async Task DeleteAsync(int id)
    {
        var part = await _context.Parts.FindAsync(id);
        if (part == null) return;

        _context.Parts.Remove(part);
    }
}
