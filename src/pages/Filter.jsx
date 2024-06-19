import { useEffect, useState } from "react";
import styles from "./Filter.module.css";
import {iceCreamData} from "./iceCreamData"

function Filter() {
  // ======== Setting up initial value ======== //
  // Create 3 arrays for each categories
  const [selectedDairyFree, setSelectedDairyFree] = useState([])
  const [selectedFlavours, setSelectedFlavours] = useState([])
  const [selectedColours, setSelectedColours] = useState([])
  // The filteredCategories will be the final array we want to render out
  const [filteredCategories, setFilteredCategories] = useState(iceCreamData)

  // ========== Storing the checkboxes value into different categories in their own array ========== //
  // If what we selected is "Dairy Free" previously, the "Dairy Free" will be removed from the array.
  // Otherwise, we will create something like ["Dairy Free", "Non Dairy Free" ]
  const handleDairyFreeChange = (dairyOption) => {
    setSelectedDairyFree((prevDairyFree) => 
      prevDairyFree.includes(dairyOption) ? prevDairyFree.filter((iceCream)=> iceCream !== dairyOption) : [...prevDairyFree, dairyOption]
    )
  }

  const handleFlavourChange = (flavour) => {
    setSelectedFlavours((prevFlavours) => 
      prevFlavours.includes(flavour) ? prevFlavours.filter((iceCream)=> iceCream !== flavour) : [...prevFlavours, flavour]
    )
  }

  const handleColourChange = (colour) => {
    setSelectedColours((prevColours) => 
      prevColours.includes(colour) ? prevColours.filter((iceCream)=> iceCream !== colour) : [...prevColours, colour]
    )
  }

  useEffect(()=>{
    // Filter iceCreamData uses includes method to check if the checkboxes value match the object value => return boolean
    // We keep the one that has true value in the filtered array
    const filteredData = iceCreamData.filter((iceCream)=>{
      const dairyFilterPassed = selectedDairyFree.length === 0 || selectedDairyFree.includes(iceCream.dairyOption)
      const flavourFilterPassed = selectedFlavours.length === 0 || selectedFlavours.includes(iceCream.flavour)
      const colourFilterPassed = selectedColours.length === 0 || selectedColours.includes(iceCream.colour)

      // Gather the object that has true value from each category.
      return dairyFilterPassed && flavourFilterPassed && colourFilterPassed
    })

    // Update filteredCategories state with the filtered data
    setFilteredCategories(filteredData)
  },[selectedDairyFree, selectedFlavours, selectedColours])

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <h2>Filtering Exercise</h2>
        <br />
        {/* =====================  Checkbox =====================*/}
        <h3>Dairy Free</h3>
        <div className={styles.checkboxContainer}>
          {["Dairy Free", "Non Dairy Free"].map((dairyOption) => (
            <div key={dairyOption}>
              <input type="checkbox" value={dairyOption} onChange={()=>handleDairyFreeChange(dairyOption)}/>
              <label>{dairyOption}</label>
            </div>
          ))}
        </div>
        <br />

        <h3>Flavour</h3>
        <div className={styles.checkboxContainer}>
          {["Vanilla", "Chocolate", "Fruit", "Rainbow"].map((flavour) => (
            <div key={flavour}>
              <input type="checkbox" value={flavour} onChange={()=> handleFlavourChange(flavour)}/>
              <label>{flavour}</label>
            </div>
          ))}
        </div>
        <br />

        <h3>Colour</h3>
        <div className={styles.checkboxContainer}>
          {["Pink", "Chocolate", "White", "Others"].map((colour) => (
            <div key={colour}>
              <input type="checkbox" value={colour} onChange={()=>handleColourChange(colour)}/>
              <label>{colour}</label>
            </div>
          ))}
        </div>
      </div>
      <br />

      {/* ================ Filtered Display Section ================*/}
      <div className={styles.pictureGallery}>
          {filteredCategories.map((iceCream)=>{
            return(
              <div className={styles.pictureItem} key={iceCream.id}>
                <img src={iceCream.image} alt={iceCream.name} />
                <p>{iceCream.name}</p>
              </div>
            )
          })
          }
      </div>
    </div>
  );
}
export default Filter;
