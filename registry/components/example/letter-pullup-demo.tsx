import LetterPullup from "@/components/magicui/letter-pullup";

 export default async function LetterPullupDemo() {
   return (
     <LetterPullup
       className = "text-black"
       words = { "Staggered Letter Pull Up" }
       delay = { 0.05 }
     />
   );
 }