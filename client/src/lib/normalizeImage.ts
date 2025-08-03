import EXIF from 'exif-js';

export const normalizeImage = async (file: File): Promise<File> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const reader = new FileReader();

		reader.onload = e => {
			if (!e.target?.result) return reject(new Error('Failed to read file'));
			img.src = e.target.result as string;
		};

		img.onload = async () => {
			try {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d')!;
				if (!ctx) return reject(new Error('Failed to get canvas context'));

				// Get EXIF orientation with fallback
				let orientation = 1;
				try {
					orientation = await new Promise<number>(resolve => {
						EXIF.getData(img as unknown as string, () => {
							const exifOrientation = EXIF.getTag(img, 'Orientation');
							resolve(exifOrientation !== undefined ? exifOrientation : 1);
						});
					});
				} catch (exifError) {
					console.warn('EXIF parsing failed, using default orientation:', exifError);
				}

				// Get adjusted dimensions with resizing
				const maxDimension = 1000;
				const { width, height } = await getRotatedDimensions(img, orientation, maxDimension);
				canvas.width = width;
				canvas.height = height;

				// Apply rotation based on EXIF orientation
				ctx.save();
				switch (orientation) {
					case 2:
						ctx.translate(width, 0);
						ctx.scale(-1, 1);
						break;
					case 3:
						ctx.translate(width, height);
						ctx.rotate((180 * Math.PI) / 180);
						break;
					case 4:
						ctx.translate(0, height);
						ctx.scale(1, -1);
						break;
					case 5:
						ctx.translate(width, height);
						ctx.rotate((90 * Math.PI) / 180);
						ctx.scale(1, -1);
						break;
					case 6:
						ctx.translate(width, 0);
						ctx.rotate((90 * Math.PI) / 180);
						break;
					case 7:
						ctx.translate(0, height);
						ctx.rotate((270 * Math.PI) / 180);
						ctx.scale(1, -1);
						break;
					case 8:
						ctx.translate(0, height);
						ctx.rotate((270 * Math.PI) / 180);
						break;
					default:
						break;
				}

				ctx.drawImage(img, 0, 0, width, height);
				ctx.restore();

				// Convert to JPEG
				canvas.toBlob(
					blob => {
						if (!blob) return reject(new Error('Failed to convert image to blob'));
						const normalizedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
							type: 'image/jpeg',
						});
						console.log('Normalized file size:', normalizedFile.size);
						resolve(normalizedFile);
					},
					'image/jpeg',
					0.7,
				);
			} catch (error) {
				reject(error);
			}
		};

		img.onerror = () => reject(new Error('Failed to load image'));
		reader.onerror = () => reject(new Error('Failed to read file'));
		reader.readAsDataURL(file);
	});
};

const getRotatedDimensions = async (img: HTMLImageElement, orientation: number, maxDimension: number): Promise<{ width: number; height: number }> => {
	return new Promise(resolve => {
		let { width, height } = img;
		const scale = Math.min(maxDimension / width, maxDimension / height, 1);
		width = Math.round(width * scale);
		height = Math.round(height * scale);
		if (orientation >= 5 && orientation <= 8) {
			[width, height] = [height, width];
		}
		resolve({ width, height });
	});
};
