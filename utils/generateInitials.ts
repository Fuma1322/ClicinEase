export function generateInitials(name:string | null | undefined): string {
   if (name){
    const nameParts = name.split(" ");
    const initials = nameParts.map(part => part.charAt(0).toUpperCase());

    return initials.join('');
   } else {
    return "CN"
   }
}