using LicentaBackEnd.DBContext;

namespace LicentaBackEnd.Service
{
    public interface IService<T> where T : class
    {
        T GetById(Guid id);
        T GetByConition(Func<T, bool> condition);
        T Add(T entity);
        T Update(T entity);
        bool Delete(Guid id);
        IQueryable<T> GetMany( Func<T, bool>? condition = null);
    }
}
