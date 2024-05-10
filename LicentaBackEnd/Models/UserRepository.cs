namespace LicentaBackEnd.Models
{
    public class UserRepository
    {
        public Guid UserId { get; set;}
        public Guid RepositoryId {get; set;}
        public string Privileges { get; set;}
    }
}
