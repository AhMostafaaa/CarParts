public class UnitOfWork : IUnitOfWork
{
    private readonly DatabaseContext _context;

    public IPartService Parts { get; }
    public ISellerService Sellers { get; }
    public ICategoryService Categories { get; }

    public UnitOfWork(DatabaseContext context, IPartService partService, ISellerService sellerService, ICategoryService categoryService)
    {
        _context = context;
        Parts = partService;
        Sellers = sellerService;
        Categories = categoryService;
    }

    public async Task<int> CompleteAsync()
    {
        return await _context.SaveChangesAsync();
    }
}
