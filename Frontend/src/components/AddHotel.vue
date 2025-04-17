<template>
  <div class="contact1">
    <form class="contact1-form validate-form" @submit="checkForm" enctype="multipart/form-data">
      <div class="row" v-if="errors.length" dir="ltr">
        <ul>
          <li v-for="error in errors" class="alert alert-danger">{{ error }}</li>
        </ul>
      </div>
      <div class="row">
        <div class="wrap-input1 validate-input" data-validate="Name is required">
          <input class="input1" style="font-family: vazirregular" type="text" name="city"
                 placeholder="نام شهر" v-model="hotelCity">
          <span class="shadow-input1"></span>
        </div>
      </div>
      <div class="row">
        <div class="wrap-input1 validate-input" data-validate="Valid email is required: ex@abc.xyz">
          <input class="input1" style="font-family: vazirregular" type="text" name="name"
                 placeholder="نام کامل هتل" v-model="hotelName">
          <span class="shadow-input1"></span>
        </div>
      </div>

      <div class="row">
        <div class="wrap-input1 validate-input" data-validate="Name is required">
          <input class="input1" style="font-family: vazirregular" type="text" name="address" v-model="address"
                 placeholder="آدرس دقیق هتل">
          <span class="shadow-input1"></span>
        </div>
      </div>

      <div class="row" style="margin: 50px auto">
        <div class="row" dir="rtl">
          <p style="padding: 10px 10px">امکانات اضافه شده: (برای حذف هریک روی آن کلیک کنید)</p>
          <ul>
            <li v-for="[k, v] in Object.entries(facilities)">
              <p>{{facility_names[k]}}</p>
              <ul v-if="v.length > 0">
                <li class="alert alert-info" v-for="(f, i) in v" @click="removeFacility(k, i)">{{f}}</li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="wrap-input1 validate-input" data-validate="Name is required">
          <p style="padding: 10px 10px; text-align: center">امکانات مورد نظر را وارد کنید و کلید زیر را فشار دهید تا تک
            به تک اضافه شود:</p>
          <input class="input1" style="font-family: vazirregular" type="text" v-model="singleFacilityName"
                 placeholder="امکانات مورد نظر را وارد کنید">
          <span class="shadow-input1"></span>
        </div>

        <div class="wrap-input1 validate-input">
          <select class="input1" style="font-family: vazirregular; border-radius: 5px; border: none;"
                  v-model="singleFacilityCategory">
            <template v-for="[k, v] in Object.entries(facility_names)">
              <option :value="k">{{v}}</option>
            </template>
          </select>
        </div>

        <div class="row" v-if="facility_errors.length" dir="ltr">
          <ul>
            <li v-for="error in facility_errors" class="alert alert-danger">{{ error }}</li>
          </ul>
        </div>

        <div class="container-contact1-form-btn">
          <button class="blue btn-submit-code" @click="addFacility" type="button">اضافه کردن امکانات</button>
        </div>
      </div>


      <div class="row">
        <div class="wrap-input1 validate-input" data-validate="Valid email is required: ex@abc.xyz">
          <textarea class="input1" style="font-family: vazirregular" name="essentialPoints"
                    placeholder="نکات ضروری" v-model="essentialPoints"></textarea>
          <span class="shadow-input1"></span>
        </div>
      </div>
      <div class="row" style="margin-left: 30%; margin-right: 30%; width: 100%">
        <input class="custom-file-input" type="file" ref="images" @change="checkInputFiles" multiple>
      </div>

      <div class="container-contact1-form-btn">
        <button class="blue btn-submit-code" type="submit">ثبت</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        facility_names: {
          general: 'کلی',
          activities: 'فعالیت ها',
          hotel_services: 'خدمات دهی هتل',
          foods_and_drinks: 'خوردنی و آشامیدنی',
          sports: 'استخر و سالن های ورزشی و بدنسازی',
          transportation: 'سرویس حمل و نقل',
          customer_services: 'خدمات دهی به مشتری',
          public_spaces: 'فضای عمومی',
          entertainment: 'سرگرمی و خدمات خانواده',
          housekeeping: 'خدمات نظافت اتاق',
          business_meetings: 'امکانات هماهنگی جلسات تجاری',
          shopping: 'فروشگاه ها',
          misc: 'متفرقه'
        },
        facilities: {
          general: [],
          activities: [],
          hotel_services: [],
          foods_and_drinks: [],
          sports: [],
          transportation: [],
          customer_services: [],
          public_spaces: [],
          entertainment: [],
          housekeeping: [],
          business_meetings: [],
          shopping: [],
          misc: []
        },
        hotelName: '',
        hotelCity: '',
        address: '',
        essentialPoints: '',
        singleFacilityName: '',
        singleFacilityCategory: '',
        files: [],
        errors: [],
        facility_errors: []
      }
    },
    methods: {
      enableSignin() {
        this.$emit('signin')
      },
      checkForm: function (e) {
        this.errors = [];

        if (!this.hotelName) {
          this.errors.push("Hotel Name required!")
        }
        if (!this.hotelCity) {
          this.errors.push("Hotel City required!")
        }
        if (!this.address) {
          this.errors.push("Address required!")
        }
        if (!this.essentialPoints) {
          this.errors.push("Please add some points!")
        }
        // if (this.facilities.length === 0)) {
        //   this.errors.push("Please add some facilities!")
        // }
        if (this.files.length !== 6) {
          this.errors.push("Please provide 6 images!");
        }

        if (!this.errors.length) {
          let formData = new FormData();
          let hotel = {
            name: this.hotelName,
            city: this.hotelCity,
            address: this.address,
            facilities: this.facilities,
            warnings: this.essentialPoints,
          };
          formData.append('hotel', JSON.stringify(hotel));

          for(let i = 0; i < this.files.length; i++ ){
            let file = this.files[i];
            formData.append('files', file);
          }

          this.$http.post('hotels/hotel', formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(response => {
              console.log(response);
              alert("Hotel added successfully!")
            });
        }

        e.preventDefault();
      },
      checkInputFiles(e) {
        this.files = e.target.files;

      },
      removeFacility(key, index) {
        this.facilities[key].splice(index, 1);
      },
      addFacility() {
        this.facility_errors = [];
        if (this.singleFacilityName === '') {
          this.facility_errors.push("Enter Facility Name!")
        } else if (this.singleFacilityCategory === '') {
          this.facility_errors.push("Select facility category!")
        } else {
          if (!(this.facilities[this.singleFacilityCategory].includes(this.singleFacilityName))) {
            this.facilities[this.singleFacilityCategory].push(this.singleFacilityName);
            console.log("facility added");
          }
        }
      }
    }
  }
</script>

<style scoped>
  .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
  }

  .custom-file-input::before {
    content: 'عکس های هتل را انتخاب کنید';
    font-family: vazirregular;
    display: inline-block;
    color: white;
    border: 1px solid #2F5BB7;
    background: -webkit-linear-gradient(top, #4C8FFB, #2F5BB7);
    background: -moz-linear-gradient(top, #4C8FFB, #2F5BB7);
    background: -ms-linear-gradient(top, #4C8FFB, #2F5BB7);
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 10pt;
    text-align: center;
  }

  .custom-file-input:hover::before {
    border-color: black;
  }

  .custom-file-input:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }

  .alert {
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }

  .alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }

  .alert-danger hr {
    border-top-color: #f1b0b7;
  }

  .alert-info {
    cursor: pointer;
    color: #0c5460;
    background-color: #d1ecf1;
    border-color: #bee5eb;
  }

  .alert-info hr {
    border-top-color: #abdde5;
  }

  .alert-info:hover {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
</style>
