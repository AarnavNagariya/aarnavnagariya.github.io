import os
from PIL import Image

def reduce_image_size(image_path, output_path, quality=85, max_size=(800, 800)):
    # Open an image file
    with Image.open(image_path) as img:
        # Resize image if it's larger than max size
        img.thumbnail(max_size)

        # Save the image with reduced quality for JPG
        if image_path.lower().endswith('.jpg') or image_path.lower().endswith('.jpeg'):
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
        elif image_path.lower().endswith('.png'):
            img.save(output_path, 'PNG', optimize=True, compress_level=9)
        print(f"Image saved to {output_path}")

def process_images_in_directory(directory_path):
    # Loop through all files in the specified directory
    for filename in os.listdir(directory_path):
        # Check if the file ends with .jpg or .jpeg
        if filename.lower().endswith('.jpg') or filename.lower().endswith('.jpeg'):
            image_path = os.path.join(directory_path, filename)
            output_path = os.path.join(directory_path, f"{os.path.splitext(filename)[0]}_web.jpg")
            reduce_image_size(image_path, output_path)
        
        if filename.lower().endswith('.png'):
            image_path = os.path.join(directory_path, filename)
            output_path = os.path.join(directory_path, f"{os.path.splitext(filename)[0]}_web.png")
            reduce_image_size(image_path, output_path)
        

# Example usage
directory_path = 'D:\Personal Website\personal-site\public\images\gallery\\neva'  # Replace with your directory path
process_images_in_directory(directory_path)
