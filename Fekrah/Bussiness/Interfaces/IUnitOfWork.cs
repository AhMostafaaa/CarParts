public interface IUnitOfWork
{
    IPartService Parts { get; }
    ISellerService Sellers { get; }
    ICategoryService Categories { get; }
    Task<int> CompleteAsync();
}
