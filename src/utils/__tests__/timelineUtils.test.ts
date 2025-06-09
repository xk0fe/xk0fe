import { getStepSide, isImageUrl } from '../timelineUtils';

describe('timelineUtils', () => {
  describe('getStepSide', () => {
    it('should return "left" for even indices', () => {
      expect(getStepSide(0)).toBe('left');
      expect(getStepSide(2)).toBe('left');
      expect(getStepSide(4)).toBe('left');
      expect(getStepSide(100)).toBe('left');
    });

    it('should return "right" for odd indices', () => {
      expect(getStepSide(1)).toBe('right');
      expect(getStepSide(3)).toBe('right');
      expect(getStepSide(5)).toBe('right');
      expect(getStepSide(99)).toBe('right');
    });

    it('should handle large numbers correctly', () => {
      expect(getStepSide(1000)).toBe('left');
      expect(getStepSide(1001)).toBe('right');
      expect(getStepSide(999999)).toBe('right');
      expect(getStepSide(1000000)).toBe('left');
    });

    it('should handle zero correctly', () => {
      expect(getStepSide(0)).toBe('left');
    });

    it('should handle negative numbers correctly', () => {
      // Even negative numbers should still return 'left'
      expect(getStepSide(-2)).toBe('left');
      expect(getStepSide(-4)).toBe('left');
      
      // Odd negative numbers should still return 'right'  
      expect(getStepSide(-1)).toBe('right');
      expect(getStepSide(-3)).toBe('right');
    });
  });

  describe('isImageUrl', () => {
    describe('HTTP URLs', () => {
      it('should return true for http URLs', () => {
        expect(isImageUrl('http://example.com/image.jpg')).toBe(true);
        expect(isImageUrl('http://test.com/photo.png')).toBe(true);
        expect(isImageUrl('http://site.org/pic.gif')).toBe(true);
      });

      it('should return true for https URLs', () => {
        expect(isImageUrl('https://example.com/image.jpg')).toBe(true);
        expect(isImageUrl('https://test.com/photo.png')).toBe(true);
        expect(isImageUrl('https://secure.site.com/image.webp')).toBe(true);
      });
    });

    describe('Relative paths', () => {
      it('should return true for paths starting with "/"', () => {
        expect(isImageUrl('/images/photo.jpg')).toBe(true);
        expect(isImageUrl('/assets/icon.png')).toBe(true);
        expect(isImageUrl('/static/picture.gif')).toBe(true);
      });

      it('should return true for relative paths without leading slash', () => {
        expect(isImageUrl('./images/photo.jpg')).toBe(true);
        expect(isImageUrl('../assets/icon.png')).toBe(true);
        expect(isImageUrl('images/picture.gif')).toBe(true);
      });
    });

    describe('Data URLs', () => {
      it('should return true for data URLs', () => {
        expect(isImageUrl('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==')).toBe(true);
        expect(isImageUrl('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD')).toBe(true);
        expect(isImageUrl('data:image/svg+xml;charset=utf-8,%3Csvg')).toBe(true);
      });
    });

    describe('File extensions', () => {
      it('should return true for common image file extensions', () => {
        expect(isImageUrl('image.jpg')).toBe(true);
        expect(isImageUrl('photo.jpeg')).toBe(true);
        expect(isImageUrl('icon.png')).toBe(true);
        expect(isImageUrl('animation.gif')).toBe(true);
        expect(isImageUrl('vector.svg')).toBe(true);
        expect(isImageUrl('modern.webp')).toBe(true);
        expect(isImageUrl('bitmap.bmp')).toBe(true);
      });

      it('should return true for files with dots in the path', () => {
        expect(isImageUrl('my.folder/image.jpg')).toBe(true);
        expect(isImageUrl('folder.name/sub.folder/pic.png')).toBe(true);
        expect(isImageUrl('version.1.0.0/icon.svg')).toBe(true);
      });

      it('should return true for uppercase extensions', () => {
        expect(isImageUrl('IMAGE.JPG')).toBe(true);
        expect(isImageUrl('PHOTO.PNG')).toBe(true);
        expect(isImageUrl('Icon.SVG')).toBe(true);
      });

      it('should return true for mixed case extensions', () => {
        expect(isImageUrl('image.JpG')).toBe(true);
        expect(isImageUrl('photo.PnG')).toBe(true);
        expect(isImageUrl('icon.SvG')).toBe(true);
      });
    });

    describe('Non-image inputs', () => {
      it('should return false for plain text without dots', () => {
        expect(isImageUrl('plaintext')).toBe(false);
        expect(isImageUrl('nodots')).toBe(false);
        expect(isImageUrl('sometext')).toBe(false);
      });

      it('should return false for non-URL, non-path strings without dots', () => {
        expect(isImageUrl('icon-name')).toBe(false);
        expect(isImageUrl('user-avatar')).toBe(false);
        expect(isImageUrl('home-icon')).toBe(false);
      });

      it('should return false for empty strings', () => {
        expect(isImageUrl('')).toBe(false);
      });

      it('should return false for whitespace-only strings', () => {
        expect(isImageUrl(' ')).toBe(false);
        expect(isImageUrl('   ')).toBe(false);
        expect(isImageUrl('\t')).toBe(false);
        expect(isImageUrl('\n')).toBe(false);
      });
    });

    describe('Edge cases', () => {
      it('should handle URLs with query parameters', () => {
        expect(isImageUrl('https://example.com/image.jpg?v=1')).toBe(true);
        expect(isImageUrl('http://test.com/photo.png?width=100&height=200')).toBe(true);
      });

      it('should handle URLs with fragments', () => {
        expect(isImageUrl('https://example.com/image.jpg#section')).toBe(true);
        expect(isImageUrl('/path/to/image.png#top')).toBe(true);
      });

      it('should handle complex file paths', () => {
        expect(isImageUrl('./assets/images/folder/subfolder/image.jpg')).toBe(true);
        expect(isImageUrl('../../../images/deep/nested/photo.png')).toBe(true);
      });

      it('should handle special characters in paths', () => {
        expect(isImageUrl('/images/my%20photo.jpg')).toBe(true);
        expect(isImageUrl('./assets/image-with-dashes.png')).toBe(true);
        expect(isImageUrl('/path/with_underscores/image.gif')).toBe(true);
      });

      it('should return true for files with multiple dots but ending with image-like extension', () => {
        expect(isImageUrl('my.image.file.jpg')).toBe(true);
        expect(isImageUrl('backup.2024.01.01.png')).toBe(true);
      });
    });

    describe('Protocol variations', () => {
      it('should return true for non-http protocols (they start with text containing dots)', () => {
        // The function checks if string starts with 'http' OR '/' OR 'data:' OR contains '.'
        // ftp://example.com/image contains '.' so it returns true
        expect(isImageUrl('ftp://example.com/image')).toBe(true);
        // file:///path/to/image doesn't contain '.' and doesn't start with 'http', '/', or 'data:'
        expect(isImageUrl('file:///path/to/image')).toBe(false);
      });

      it('should return true for non-http protocols with dots', () => {
        expect(isImageUrl('ftp://example.com/image.jpg')).toBe(true);
        expect(isImageUrl('file:///path/to/image.png')).toBe(true);
      });
    });
  });
}); 