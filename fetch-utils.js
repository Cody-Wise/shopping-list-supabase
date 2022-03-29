const SUPABASE_URL = 'https://afgbmdkvqbvliaergujk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZ2JtZGt2cWJ2bGlhZXJndWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc2Mzg2NTUsImV4cCI6MTk2MzIxNDY1NX0.VyU9_hrFWQ13GXnm_YwMxhGCqRVI1VMlopV5PCqYqYI';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function createListItems(listItem){
    const response = await client

        .from('shopping_list')
        .insert(listItem);

    return response.body;
}

export async function getShoppingItems(){
    const response = await client
        .from('shopping_list')
        .select('*');

    return response.body;
}

export async function deleteItems(){
    const user = getUser();
    const response = await client
        .from('shopping_list')
        .delete()
        .match ({ user_id: user.id });

    return response.body;
}

export async function deleteIndividualItems(id){
    // const user = getUser();
    const response = await client
        .from('shopping_list')
        .delete()
        .match ({ id });

    return response.body;
}


export async function buyItems(id){
    const response = await client
        .from('shopping_list')
        .update({ is_bought: true })
        .match({ id });
    

    return response.body;
}

export async function unBuyItems(id){
    const response = await client
        .from('shopping_list')
        .update({ is_bought: false })
        .match({ id });
    

    return response.body;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./shopping');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
