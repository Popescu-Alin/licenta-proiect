using LicentaBackEnd.DBContext;
using LicentaBackEnd.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;

namespace LicentaBackEnd.Service
{
    public class RepositoryService : BaseService, IService<Repository>
    {
        public RepositoryService(AppDBContext context) : base(context)
        {
        }

        public Repository Add(Repository entity)
        {
            Repository repository = _context.Repositories.Add(entity).Entity;
            _context.SaveChanges();
            return repository;
        }
        public IQueryable<Repository> GetMany(Func<Repository, bool>? condition)
        {
            if (condition == null)
            {
                return _context.Repositories.AsQueryable().AsNoTracking();
            }
            return _context.Repositories.Where(condition).AsQueryable().AsNoTracking();
        
        }
        public Repository GetByConition(Func<Repository, bool> condition)
        {
            return _context.Repositories.Find(condition);
        }

        public Repository GetById(Guid id)
        {
            return _context.Repositories.Find(id);
        }

        public Repository Update(Repository entity)
        {
            Repository repository = GetById(entity.Id);
            if(repository == null)
            {
                return null;
            }
            repository.Title = entity.Title;
            repository.AccessModifier = entity.AccessModifier;
            _context.SaveChanges();
            return repository;
        }

        public bool Delete(Guid id)
        {
            Repository entity = GetById(id);
            if(entity == null)
            {
                return false;
            }
            _context.Repositories.Remove(entity);
            _context.SaveChanges();
            return true;
        }
    }
}
