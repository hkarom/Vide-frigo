package src.example;

import src.source.Recipe;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

/**
 * A simple example of how to use the source.Recipe class to search a recipe.
 */
public class SimpleRecipeSearchExample {

    public static void main(String[] args) {

        System.out.println("Type the recipe to search: ");
        Scanner sc = new Scanner(System.in);
        String searchKeywords = sc.nextLine();
        searchKeywords.replaceAll(" ","-");
        try {

            ArrayList<Recipe>recipes = Recipe.search(searchKeywords);

            int i = 0;
            for (Recipe r : recipes) {
                System.out.println(i+") "+r.getName());
                i++;
            }

            System.out.println("Choose a recipe : ");
            Scanner sc2 = new Scanner(System.in);
            int indice = sc.nextInt();

            while (indice<0||indice>recipes.size()){
                System.out.println("Please choose a recipe between 0 and "+recipes.size()+" : ");
                sc2 = new Scanner(System.in);
                indice = sc.nextInt();

            }
            Recipe chosenRecipe = recipes.get(indice);

            System.out.println(chosenRecipe.getName());
            chosenRecipe.loadInformations();
            System.out.println(chosenRecipe);


        } catch (IOException e) {
            System.out.println("Unable to search the recipe");
        }






    }
}
