using Microsoft.AspNetCore.Identity;

namespace LicentaBackEnd.Models
{
    public class Role : IdentityRole<Guid>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
