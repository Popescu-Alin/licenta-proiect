using Microsoft.AspNetCore.Identity;

namespace LicentaBackEnd.Models
{
    public class User : IdentityUser<Guid>
    {   
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfilePicture { get; set; }
        public string EmailConfirmationToken { get; set; }
        public DateTime ExpirationDateEmailConfirmationToken { get; set; }
        public string ForgottenPasswordToken { get; set; }
        public DateTime ExpirationDateForgottenPasswordToken { get; set; }
        public User() : base() { }
    }
}
