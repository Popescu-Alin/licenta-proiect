namespace LicentaBackEnd.Service
{
    public interface IAssociativeService<T> where T : class
    {
        T Add(T entity);
        IQueryable<T> GetMany(Func<T, bool>? condition);
        T GetByConition(Func<T, bool> condition);
        T Update(T entity);
        bool Delete(Func<T, bool> condition);
        bool DeleteMany(Func<T, bool> condition);
        
    }
}
