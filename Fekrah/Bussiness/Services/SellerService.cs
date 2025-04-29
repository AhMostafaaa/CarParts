using Microsoft.EntityFrameworkCore;

public class SellerService : ISellerService
{
    private readonly DatabaseContext _context;

    public SellerService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<SellerViewModel>> GetAllAsync()
    {
        return await _context.Sellers
            .Select(s => new SellerViewModel
            {
                Id = s.Id,
                ShopName = s.ShopName,
                PhoneNumber = s.PhoneNumber
            }).ToListAsync();
    }

    public async Task<SellerViewModel> GetByIdAsync(int id)
    {
        var seller = await _context.Sellers.FindAsync(id);
        if (seller == null) return null;

        return new SellerViewModel
        {
            Id = seller.Id,
            ShopName = seller.ShopName,
            PhoneNumber = seller.PhoneNumber
        };
    }

    public async Task AddAsync(SellerDto dto)
    {
        var seller = new Seller
        {
            ShopName = dto.ShopName,
            PhoneNumber = dto.PhoneNumber,
            PasswordHash = dto.Password
        };

        await _context.Sellers.AddAsync(seller);
    }

    public async Task UpdateAsync(int id, SellerDto dto)
    {
        var seller = await _context.Sellers.FindAsync(id);
        if (seller == null) return;

        seller.ShopName = dto.ShopName;
        seller.PhoneNumber = dto.PhoneNumber;
    }

    public async Task DeleteAsync(int id)
    {
        var seller = await _context.Sellers.FindAsync(id);
        if (seller == null) return;

        _context.Sellers.Remove(seller);
    }
}

