import Home_Features_Section from "../components/home/Home_Features_Section";
import Home_Memories_Slider from "../components/home/Home_Memories_Slider";
import Home_Hero_Section from "../components/home/Home_Hero_Section";

export default function Index() {
    return (
        <div className="min-h-screen">

            <Home_Hero_Section />

            <Home_Features_Section />

            <Home_Memories_Slider />

        </div>
    );
}
