package cz.osu.pizzakaktus.services.Exceptions;

/**
 * Created by e-myslivost on 29.11.2016.
 */
public class ApplicationException extends Exception {

    private String errMessage;

    public ApplicationException(String errMessage)
    {
        super(errMessage);
    }

}
