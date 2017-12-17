package script;
import src.source.*;
import java.sql.*;
import java.util.ArrayList;
public class Main {
	
	public static void addRecipe(Recipe r, Connection conn) {
		// the mysql insert statement
	      String query = " insert into Recipe (id_creator, name, cooking_time, steps, category)"
	        + " values (?, ?, ?, ?,?)";
	      try {
	      // create the mysql insert preparedstatement
	      PreparedStatement preparedStmt = conn.prepareStatement(query);
	      preparedStmt.setInt (1, 0);
	      preparedStmt.setString (2, r.getName());
	      preparedStmt.setInt(4, Integer.parseInt(r.getPrepTime()));
	      preparedStmt.setString (5, r.getDetail());
	      preparedStmt.setString(6, "STARTER");

	      // execute the preparedstatement
	      preparedStmt.execute();
	      }
	      catch(Exception e) {
	    	  System.err.println(e.getMessage());
	      }
	}
	
	public static void main() {
		try {
		// create a mysql database connection
	      String myDriver = "org.gjt.mm.mysql.Driver";
	      String myUrl = "jdbc:mysql://localhost/vide_frigo";
	      Class.forName(myDriver);
	      Connection conn = DriverManager.getConnection(myUrl, "root", "");
	      ArrayList<Recipe>recipes = Recipe.search("tomate");
	      for (Recipe r : recipes) {
	    	  addRecipe(r,conn);
	      }
		
	      conn.close();
		}
		catch (Exception e){
			System.err.println(e.getMessage());
		}
		
	}
}
