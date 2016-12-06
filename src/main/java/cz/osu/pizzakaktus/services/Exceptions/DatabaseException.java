package cz.osu.pizzakaktus.services.Exceptions;

/**
 * Created by e-myslivost on 29.11.2016.
 */
public class DatabaseException extends Exception {


    public DatabaseException(String errMessage)
    {
        super(errMessage);
        System.out.println("chyba dtb");
    }

}
