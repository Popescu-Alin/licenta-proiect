using Microsoft.AspNetCore.Identity;

namespace LicentaBackEnd.Models
{
    public class User : IdentityUser<Guid>
    {   
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfilePicture { get; set; }
        public string Description { get; set; } 
        public User() : base() { }
    }
}
