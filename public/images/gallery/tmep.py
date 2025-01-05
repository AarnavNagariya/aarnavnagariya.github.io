import os

def rename_images_in_folder(direc = '',extension = 'jpg'):
    # Get the current directory where the script is located
    script_directory = os.path.dirname(os.path.abspath(__file__))
    script_directory += direc
    # List all files in the directory
    files = os.listdir(script_directory)
    
    # Filter out only .jpg files (case-insensitive)
    jpg_files = [f for f in files if f.lower().endswith('.' + extension)]
    
    # Sort files to ensure sequential renaming
    jpg_files.sort()
    
    # Rename each .jpg file
    for index, old_name in enumerate(jpg_files, start=1):
        # Construct new file name
        new_name = f"{index}" + '.' + extension
        
        # Get full paths
        old_path = os.path.join(script_directory, old_name)
        new_path = os.path.join(script_directory, new_name)
        
        # Rename the file
        os.rename(old_path, new_path)
        print(f"Renamed: {old_name} -> {new_name}")

if __name__ == "__main__":
    rename_images_in_folder('/neva','png')
