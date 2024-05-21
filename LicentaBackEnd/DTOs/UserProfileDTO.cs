namespace LicentaBackEnd.DTOs
{
    public class UserProfileDTO
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        
        public int NumberOfPosts { get; set; }

        public int NumberOfRepos { get; set;}

        public string ImageURL { get; set; }

        public string Description { get; set; }

    }
}
