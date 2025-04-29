public interface ISellerService
{
    Task<IEnumerable<SellerViewModel>> GetAllAsync();
    Task<SellerViewModel> GetByIdAsync(int id);
    Task AddAsync(SellerDto dto);
    Task UpdateAsync(int id, SellerDto dto);
    Task DeleteAsync(int id);
}

