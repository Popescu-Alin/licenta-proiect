using LicentaBackEnd.DBContext;

namespace LicentaBackEnd.Service
{
    public class BaseService
    {
        protected readonly AppDBContext _context;
        public BaseService(AppDBContext context)
        {
            _context = context;
        }
    }
}
