// This file was generated by Mendix Business Modeler.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package myfirstmodule.proxies;

import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IMendixIdentifier;
import com.mendix.systemwideinterfaces.core.IMendixObject;

/**
 * 
 */
public class Camera
{
	private final IMendixObject cameraMendixObject;

	private final IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final String entityName = "MyFirstModule.Camera";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		Name("Name"),
		Location("Location"),
		TimerObjects_Camera("MyFirstModule.TimerObjects_Camera");

		private String metaName;

		MemberNames(String s)
		{
			metaName = s;
		}

		@Override
		public String toString()
		{
			return metaName;
		}
	}

	public Camera(IContext context)
	{
		this(context, Core.instantiate(context, "MyFirstModule.Camera"));
	}

	protected Camera(IContext context, IMendixObject cameraMendixObject)
	{
		if (cameraMendixObject == null)
			throw new IllegalArgumentException("The given object cannot be null.");
		if (!Core.isSubClassOf("MyFirstModule.Camera", cameraMendixObject.getType()))
			throw new IllegalArgumentException("The given object is not a MyFirstModule.Camera");

		this.cameraMendixObject = cameraMendixObject;
		this.context = context;
	}

	/**
	 * @deprecated Use 'new Camera(Context)' instead. Note that the constructor will not insert the new object in the database.
	 */
	@Deprecated
	public static myfirstmodule.proxies.Camera create(IContext context) throws CoreException
	{
		IMendixObject mendixObject = Core.create(context, "MyFirstModule.Camera");
		return new myfirstmodule.proxies.Camera(context, mendixObject);
	}

	/**
	 * @deprecated Use 'Camera.load(IContext, IMendixIdentifier)' instead.
	 */
	@Deprecated
	public static myfirstmodule.proxies.Camera initialize(IContext context, IMendixIdentifier mendixIdentifier) throws CoreException
	{
		return myfirstmodule.proxies.Camera.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.getSudoContext() can be used to obtain sudo access).
	 */
	public static myfirstmodule.proxies.Camera initialize(IContext context, IMendixObject mendixObject)
	{
		return new myfirstmodule.proxies.Camera(context, mendixObject);
	}

	public static myfirstmodule.proxies.Camera load(IContext context, IMendixIdentifier mendixIdentifier) throws CoreException
	{
		IMendixObject mendixObject = Core.retrieveId(context, mendixIdentifier);
		return myfirstmodule.proxies.Camera.initialize(context, mendixObject);
	}

	public static java.util.List<myfirstmodule.proxies.Camera> load(IContext context, String xpathConstraint) throws CoreException
	{
		java.util.List<myfirstmodule.proxies.Camera> result = new java.util.ArrayList<myfirstmodule.proxies.Camera>();
		for (IMendixObject obj : Core.retrieveXPathQuery(context, "//MyFirstModule.Camera" + xpathConstraint))
			result.add(myfirstmodule.proxies.Camera.initialize(context, obj));
		return result;
	}

	/**
	 * Commit the changes made on this proxy object.
	 */
	public final void commit() throws CoreException
	{
		Core.commit(context, getMendixObject());
	}

	/**
	 * Commit the changes made on this proxy object using the specified context.
	 */
	public final void commit(IContext context) throws CoreException
	{
		Core.commit(context, getMendixObject());
	}

	/**
	 * Delete the object.
	 */
	public final void delete()
	{
		Core.delete(context, getMendixObject());
	}

	/**
	 * Delete the object using the specified context.
	 */
	public final void delete(IContext context)
	{
		Core.delete(context, getMendixObject());
	}
	/**
	 * @return value of Name
	 */
	public final String getName()
	{
		return getName(getContext());
	}

	/**
	 * @param context
	 * @return value of Name
	 */
	public final String getName(IContext context)
	{
		return (String) getMendixObject().getValue(context, MemberNames.Name.toString());
	}

	/**
	 * Set value of Name
	 * @param name
	 */
	public final void setName(String name)
	{
		setName(getContext(), name);
	}

	/**
	 * Set value of Name
	 * @param context
	 * @param name
	 */
	public final void setName(IContext context, String name)
	{
		getMendixObject().setValue(context, MemberNames.Name.toString(), name);
	}

	/**
	 * @return value of Location
	 */
	public final String getLocation()
	{
		return getLocation(getContext());
	}

	/**
	 * @param context
	 * @return value of Location
	 */
	public final String getLocation(IContext context)
	{
		return (String) getMendixObject().getValue(context, MemberNames.Location.toString());
	}

	/**
	 * Set value of Location
	 * @param location
	 */
	public final void setLocation(String location)
	{
		setLocation(getContext(), location);
	}

	/**
	 * Set value of Location
	 * @param context
	 * @param location
	 */
	public final void setLocation(IContext context, String location)
	{
		getMendixObject().setValue(context, MemberNames.Location.toString(), location);
	}

	/**
	 * @return value of TimerObjects_Camera
	 */
	public final myfirstmodule.proxies.TimerItems getTimerObjects_Camera() throws CoreException
	{
		return getTimerObjects_Camera(getContext());
	}

	/**
	 * @param context
	 * @return value of TimerObjects_Camera
	 */
	public final myfirstmodule.proxies.TimerItems getTimerObjects_Camera(IContext context) throws CoreException
	{
		myfirstmodule.proxies.TimerItems result = null;
		IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.TimerObjects_Camera.toString());
		if (identifier != null)
			result = myfirstmodule.proxies.TimerItems.load(context, identifier);
		return result;
	}

	/**
	 * Set value of TimerObjects_Camera
	 * @param timerobjects_camera
	 */
	public final void setTimerObjects_Camera(myfirstmodule.proxies.TimerItems timerobjects_camera)
	{
		setTimerObjects_Camera(getContext(), timerobjects_camera);
	}

	/**
	 * Set value of TimerObjects_Camera
	 * @param context
	 * @param timerobjects_camera
	 */
	public final void setTimerObjects_Camera(IContext context, myfirstmodule.proxies.TimerItems timerobjects_camera)
	{
		if (timerobjects_camera == null)
			getMendixObject().setValue(context, MemberNames.TimerObjects_Camera.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.TimerObjects_Camera.toString(), timerobjects_camera.getMendixObject().getId());
	}

	/**
	 * @return the IMendixObject instance of this proxy for use in the Core interface.
	 */
	public final IMendixObject getMendixObject()
	{
		return cameraMendixObject;
	}

	/**
	 * @return the IContext instance of this proxy, or null if no IContext instance was specified at initialization.
	 */
	public final IContext getContext()
	{
		return context;
	}

	@Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final myfirstmodule.proxies.Camera that = (myfirstmodule.proxies.Camera) obj;
			return getMendixObject().equals(that.getMendixObject());
		}
		return false;
	}

	@Override
	public int hashCode()
	{
		return getMendixObject().hashCode();
	}

	/**
	 * @return String name of this class
	 */
	public static String getType()
	{
		return "MyFirstModule.Camera";
	}

	/**
	 * @return String GUID from this object, format: ID_0000000000
	 * @deprecated Use getMendixObject().getId().toLong() to get a unique identifier for this object.
	 */
	@Deprecated
	public String getGUID()
	{
		return "ID_" + getMendixObject().getId().toLong();
	}
}