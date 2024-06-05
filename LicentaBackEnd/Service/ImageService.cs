using System.Collections;

namespace LicentaBackEnd.Service
{
    public static class ImageService
    {

        public async static Task<string?> SaveImage( string rootPath,IFormFile file)
        {

            try
            {
                string fileName = DateTime.UtcNow.Ticks + "_" + Guid.NewGuid() + ".png";
                string path = Path.Combine(rootPath, "Public", fileName);
                using (var fs = new FileStream(path, FileMode.Create, FileAccess.Write))
                {
                    await file.CopyToAsync(fs);
                    return fileName;
                }
            }
            catch
            {
                return null;
            }
        }

        public static void DeleteImage(string rootPath, string fileName)
        {
            string path = Path.Combine(rootPath, "Public", fileName);
            if (File.Exists(path))
            {
                File.Delete(path);
            }
        }

    }
}
