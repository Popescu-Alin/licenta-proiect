using LicentaBackEnd.DBContext;
using LicentaBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace LicentaBackEnd.Service
{
    public class LikeService : BaseService, IAssociativeService<Like>
    {
        public LikeService(AppDBContext context) : base(context)
        {
        }

        public Like Add(Like entity)
        {
            Like like = _context.Likes.Add(entity).Entity;
            _context.SaveChanges();
            return like;
        }

        public bool Delete(Func<Like, bool> condition)
        {
            Like entity = GetByConition(condition);
            if (entity == null)
            {
                return false;
            }
            _context.Likes.Remove(entity);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteMany(Func<Like, bool> condition)
        {
            var likes = GetMany(condition);
            if (likes == null)
            {
                return false;
            }
            _context.Likes.RemoveRange(likes);
            _context.SaveChanges();
            return true;
        }

        public Like GetByConition(Func<Like, bool> condition)
        {
            return _context.Likes.Where(condition).FirstOrDefault();
        }

        public IQueryable<Like> GetMany(Func<Like, bool>? condition)
        {
            if (condition == null)
            {
                return _context.Likes.AsQueryable().AsNoTracking();
            }
            return _context.Likes.Where(condition).AsQueryable().AsNoTracking();
        }

        public Like Update(Like entity)
        {
            throw new NotImplementedException();
        }
    }
}
