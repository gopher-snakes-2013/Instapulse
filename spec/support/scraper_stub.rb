module ScraperStub
	extend self

	def igdata
		{
      "attribution"=> nil,
      "tags"=>  [],
      "type"=> "image",
      "location"=>  {
        "latitude"=> 37.760208333,
        "longitude"=> -122.422163333
      },
      "comments"=>  {
        "count"=> 0,
        "data"=>  []
      },
      "filter"=> "Mayfair",
      "created_time"=> "1384148161",
      "link"=> "http://instagram.com/p/gkBV7yrjps/",
      "likes"=>  {
        "count"=> 0,
        "data"=>  []
      },
      "images"=>  {
        "low_resolution"=>  {
          "url"=> "http://distilleryimage8.s3.amazonaws.com/269e609a4a9311e3931a0eb48f42df98_6.jpg",
          "width"=> 306,
          "height"=> 306
        },
        "thumbnail"=>  {
          "url"=> "http://distilleryimage8.s3.amazonaws.com/269e609a4a9311e3931a0eb48f42df98_5.jpg",
          "width"=> 150,
          "height"=> 150
        },
        "standard_resolution"=>  {
          "url"=> "http://distilleryimage8.s3.amazonaws.com/269e609a4a9311e3931a0eb48f42df98_8.jpg",
          "width"=> 640,
          "height"=> 640
        }
      },
      "users_in_photo"=>  [],
      "caption"=>  {
        "created_time"=> "1384148167",
        "text"=> "Cute",
        "from"=>  {
          "username"=> "sherlyn_eb_izzle",
          "profile_picture"=> "http://images.ak.instagram.com/profiles/profile_104872957_75sq_1380380475.jpg",
          "id"=> "104872957",
          "full_name"=> "Sherlyn"
        },
        "id"=> "586599807245498580"
      },
      "user_has_liked"=> false,
      "id"=> "586599756821576300_104872957",
      "user"=>  {
        "username"=> "sherlyn_eb_izzle",
        "website"=> "",
        "profile_picture"=> "http://images.ak.instagram.com/profiles/profile_104872957_75sq_1380380475.jpg",
        "full_name"=> "Sherlyn",
        "bio"=> "",
        "id"=> "104872957"
      }
    }
	end

	def parsed_ig_photo
		{
		  insta_id: "586599756821576300_104872957",
		  latitude: 37.760208333,
		  longitude: -122.422163333,
		  created_time: "1384148161",
		  like_count: 0,
		  link: "http://instagram.com/p/gkBV7yrjps/",
		  thumbnail_url: "http://distilleryimage8.s3.amazonaws.com/269e609a4a9311e3931a0eb48f42df98_5.jpg",
		  caption: "Cute"
		}
	end
end