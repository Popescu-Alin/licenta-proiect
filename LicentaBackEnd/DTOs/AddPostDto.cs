namespace LicentaBackEnd.DTOs
{
    public class AddPostDto
    {
        public string FileName { get; set; }
        public string Content { get; set; }
        public Guid UserId { get; set; }
    }
}
