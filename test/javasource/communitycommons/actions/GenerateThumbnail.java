// This file was generated by Mendix Business Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
// Special characters, e.g., é, ö, à, etc. are supported in comments.

package communitycommons.actions;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.InputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.imageio.ImageIO;
import com.mendix.core.Core;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IMendixObject;
import com.mendix.webui.CustomJavaAction;

/**
 * Generates a thumbnail for a source object that preserves aspect ratio. Some borders might be clipped to achieve this. 
 * 
 * If the thumbnail is larger than the source image, the image will not be upscaled, but use transparent borders instead
 * 
 */
public class GenerateThumbnail extends CustomJavaAction<Boolean>
{
	private IMendixObject __sourceObj;
	private system.proxies.Image sourceObj;
	private Long thumbnailWidth;
	private Long thumbnailHeight;

	public GenerateThumbnail(IContext context, IMendixObject sourceObj, Long thumbnailWidth, Long thumbnailHeight)
	{
		super(context);
		this.__sourceObj = sourceObj;
		this.thumbnailWidth = thumbnailWidth;
		this.thumbnailHeight = thumbnailHeight;
	}

	@Override
	public Boolean executeAction() throws Exception
	{
		this.sourceObj = __sourceObj == null ? null : system.proxies.Image.initialize(getContext(), __sourceObj);

		// BEGIN USER CODE

		InputStream is = Core.getImage(getContext(), sourceObj.getMendixObject(), false);
		BufferedImage img = ImageIO.read(is);

		int tw = (int)(long)thumbnailWidth;
		int th = (int)(long)thumbnailHeight;
		int sx1, sx2, sy1, sy2, dx1, dx2, dy1, dy2;

		//Source is smaller than target image? Do not upscale, just center
		if (img.getWidth() < tw || img.getHeight() < th)
		{
			sx1 = 0;
			sy1 = 0;
			sx2 = img.getWidth();
			sy2 = img.getHeight();

			//draw in center
			dx1 = (tw - img.getWidth()) / 2;
			dx2 = dx1 + img.getWidth();
			dy1 = (th - img.getHeight()) / 2;
			dy2 = dy1 + img.getHeight();
		}

		else
		{
			double resizeFactor = Math.min(img.getWidth() / tw, img.getHeight() / th);

			sx1 = (int)((img.getWidth() - tw * resizeFactor) / 2);
			sx2 = (int)(sx1 + tw * resizeFactor);
			sy1 = (int)((img.getHeight() - th * resizeFactor) / 2);
			sy2 = (int)(sy1 + th * resizeFactor);

			dx1 = 0;
			dx2 = tw;
			dy1 = 0;
			dy2 = th;
		}

		BufferedImage dstImage = new BufferedImage(tw, th, BufferedImage.TYPE_INT_ARGB);
		dstImage.getGraphics().drawImage(img, dx1, dy1, dx2, dy2, sx1, sy1, sx2, sy2, null);

		//MWE: there is no Core api to just write the thumbnail stream, so lets do thet ourselves...
        File basefilename = Core.getComponent().fileProcessor().getFileDocumentAsFile(getContext(), __sourceObj);
        String thumbfile = basefilename.getPath().replaceFirst(Pattern.quote(File.separator + "files" + File.separator),
                Matcher.quoteReplacement(File.separator + "files" + File.separator + "thumbs" + File.separator));

        ImageIO.write(dstImage, "png", new File(thumbfile));

        return true;
		// END USER CODE
	}

	/**
	 * Returns a string representation of this action
	 */
	@Override
	public String toString()
	{
		return "GenerateThumbnail";
	}

	// BEGIN EXTRA CODE
	// END EXTRA CODE
}
