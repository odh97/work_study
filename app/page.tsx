import PopoverButton from "@/app/_component/ui/popoverButton";
import AvatarDemo from "@/app/_component/ui/avatarDemo";
import AccordionDemo from "@/app/_component/ui/accordionDemo";
import AlertDialogDemo from "@/app/_component/ui/alertDialogDemo";

export default function Home() {
  return (
    <div className={"mx-auto w-[95%]"}>
      <h1 className={"py-5 text-center"}>메인페이지입니다.</h1>
      <div className={"mb-[30px]"}>
        <PopoverButton />
      </div>
      <div className={"mb-[30px]"}>
        <AvatarDemo />
      </div>
      <div className={"mb-[30px]"}>
        <AccordionDemo />
      </div>
      <div className={"mb-[30px]"}>
        <AlertDialogDemo />
      </div>
    </div>
  );
}
function Calendar() {
  return (
    <div className="wrapper">
      <header>
        <div className="nav">
          <button className="material-icons"> chevron_left </button>
          <p className="current-date">September 2022</p>
          <button className="material-icons"> chevron_right </button>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days">
          <li className="inactive">27</li>
          <li className="inactive">28</li>
          <li className="inactive">29</li>
          <li className="inactive">30</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
          <li>31</li>
        </ul>
      </div>
    </div>
  );
}
