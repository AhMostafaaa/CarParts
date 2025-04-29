public interface IPartService
{
    Task<IEnumerable<PartViewModel>> GetAllAsync();
    Task<PartViewModel> GetByIdAsync(int id);
    Task AddAsync(PartDto dto);
    Task UpdateAsync(int id, PartDto dto);
    Task DeleteAsync(int id);
}
