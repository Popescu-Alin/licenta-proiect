using LicentaBackEnd.DBContext;
using LicentaBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace LicentaBackEnd.Service
{
    public class RepositoryPostService : BaseService, IAssociativeService<RepositoryPost>
    {
        public RepositoryPostService(AppDBContext context) : base(context)
        {
        }

        public RepositoryPost Add(RepositoryPost entity)
        {
            RepositoryPost repoPost = _context.RepositoryPosts.Add(entity).Entity;
            _context.SaveChanges();
            return repoPost;
        }

        public bool Delete(Func<RepositoryPost, bool> condition)
        {
            RepositoryPost repoPost = GetByConition(condition);
            if (repoPost == null)
            {
                return false;
            }   
            _context.RepositoryPosts.Remove(repoPost);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteMany(Func<RepositoryPost, bool> condition)
        {
           var repoPosts = GetMany(condition);
            if (repoPosts == null)
            {
                return false;
            }
            _context.RepositoryPosts.RemoveRange(repoPosts);
            _context.SaveChanges();
            return true;
        }

        public RepositoryPost GetByConition(Func<RepositoryPost, bool> condition)
        {
            return _context.RepositoryPosts.Where(condition).FirstOrDefault();
        }

        public IQueryable<RepositoryPost> GetMany(Func<RepositoryPost, bool>? condition)
        {
            if(condition == null)
            {
                return _context.RepositoryPosts.AsQueryable().AsNoTracking();
            }
            return _context.RepositoryPosts.Where(condition).AsQueryable().AsNoTracking();
        }

        public RepositoryPost Update(RepositoryPost entity)
        {
            throw new NotImplementedException();
        }
    }
}
