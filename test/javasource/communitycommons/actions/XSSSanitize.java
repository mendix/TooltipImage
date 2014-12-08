// This file was generated by Mendix Business Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
// Special characters, e.g., é, ö, à, etc. are supported in comments.

package communitycommons.actions;

import communitycommons.StringUtils;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.webui.CustomJavaAction;

/**
 * Removes all potiential dangerous HTML from a string so that it can be safely displayed in a browser. 
 * 
 * This function should be applied to all HTML which is displayed in the browser, and can be entered by (untrusted) users.
 * 
 * - HTML: The html to sanitize
 * - policy: The policy that defines the allowed HTML tags a user is allowd to use:
 * 
 * (see the developers guide in the resources folder for more details about the policies)
 * 
 * TinyMCE: Based on the HTML WYSIWYG editor, relatively safe. This policy file only allows text formatting, and may be a good choice if users are submitting HTML to be used in a blog post.
 * 
 * Allow anything: A very dangerous policy file, this will allow all HTML, CSS and JavaScript. You shouldn't use this in production.
 * 
 * Ebay: Based on the content filtering for the popular electronic auction website, relatively safe. This policy file gives the user a little bit of freedom, and may be a good choice if users are submitting HTML for a large portion of a page.
 * 
 * MySpace: Based on the content filtering for the popular social networking site, relatively dangerous. This policy file gives the user a lot of freedom, and may be a good choice if users are submitting HTML for an entire page.
 * 
 * Slashdot: Based on the comment filtering on the popular news site, but not quite as strict. This policy file only allows strict text formatting, and may be a good choice if users are submitting HTML in a comment thread.
 */
public class XSSSanitize extends CustomJavaAction<String>
{
	private String html;
	private communitycommons.proxies.XSSPolicy policy;

	public XSSSanitize(IContext context, String html, String policy)
	{
		super(context);
		this.html = html;
		this.policy = policy == null ? null : communitycommons.proxies.XSSPolicy.valueOf(policy);
	}

	@Override
	public String executeAction() throws Exception
	{
		// BEGIN USER CODE
		return StringUtils.XSSSanitize(html, policy);
		// END USER CODE
	}

	/**
	 * Returns a string representation of this action
	 */
	@Override
	public String toString()
	{
		return "XSSSanitize";
	}

	// BEGIN EXTRA CODE
	// END EXTRA CODE
}
