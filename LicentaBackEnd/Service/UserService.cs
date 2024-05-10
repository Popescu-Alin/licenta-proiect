using LicentaBackEnd.DBContext;
using LicentaBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace LicentaBackEnd.Service
{
    public class UserService : BaseService, IService<User>
    {
        public UserService(AppDBContext context) : base(context)
        {
        }

        public User Add(User entity)
        {
            User user = _context.Users.Add(entity).Entity;
            return user;
        }

        public bool Delete(Guid id)
        {
            User user =  GetById(id);
            if (user == null)
            {
                return false;
            }
            _context.Users.Remove(user);
            _context.SaveChanges();
            return true;
            
        }

        public IQueryable<User> GetMany(Func<User, bool> condition = null)
        {
            if(condition != null)
            {
                return _context.Users.Where(condition).AsQueryable().AsNoTracking();
            }
            return _context.Users.AsQueryable().AsNoTracking();
        }

        public User GetByConition(Func<User, bool> condition)
        {
            return _context.Users.Find(condition);
        }

        public  User GetById(Guid id)
        { 
            return _context.Users.Find(id);
        }

        public  User Update(User entity)
        {
            User user = GetById(entity.Id);
            if(user == null)
            {
                return user;
            }

            user.UserName = entity.UserName;
            user.Email = entity.Email;
            user.PasswordHash = entity.PasswordHash;
            user.NormalizedEmail = entity.NormalizedEmail;
            user.NormalizedUserName = entity.NormalizedUserName;

            _context.SaveChanges();
            return user;

        }
    }
}
