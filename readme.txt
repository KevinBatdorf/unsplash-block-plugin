=== Unlimited Photos ===
Contributors:      kbat82
Tags:              block, stock photos, news, images, photography
Tested up to:      6.0
Stable tag:        1.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Search over 3 million photos, textures, wallpapers, and more.

== Description ==

Unlimited Photos is a Gutenberg block plugin that integrates into the core image block, providing a way to view, search, and import over 3 million free-to-use photos, images, and more...

Looking for that stock photo that perfectly matches your recipe blog post? Or the perfect current event pic that describes exactly the intensity your story conveys? Writing a blog post for your business? Unlimited photos has exactly what you are looking for, for free.

= Features =
- Search over 3 million photos, textures, wallpapers, and more.
- Your search is saved so you can always pick up where you left off.
- Import photos right into the core image block (and the media library too)
- Search anything, or select from a predefined list
- No lock in, delete at any time and nothing changes

= More info =
- Follow [@kevinbatdorf](https://twitter.com/kevinbatdorf) on Twitter
- View on [GitHub](https://github.com/KevinBatdorf/unsplash-block-plugin)

= Terms of Use & Privacy =

While using this plugin you will interact with an API at [unsplash-api-search.vercel.app](https://unsplash-api-search.vercel.app/) that returns images based on your search terms. Referral information (IP address, domain, and the content being requested) is sent to the server. No additional information is tracked.

You may audit the server code at its [GitHub repository](https://github.com/KevinBatdorf/unsplash-api).

The server is hosted on [Vercel](https://vercel.com/), and by connecting to their servers, you also agree to their [privacy policy](https://vercel.com/legal/privacy-policy) and [terms](https://vercel.com/legal/terms) as well.

Further, the API mentioned above routes requests to [Unsplash.com](https://unsplash.com). You can view their privacy policy here ([Unsplash Privacy Policy](https://unsplash.com/privacy)).

[General API terms](https://unsplash-api-search.vercel.app/terms.html)

== Installation ==

1. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= Are they really free to use? =

Yes! For both commercial and non-commercial sites. Read more about the license for [Unsplash images](https://unsplash.com/license).

= What happens when I deactivate this plugin? =

Nothing. We cleanly integrate into the image block, and when you import an image, we hand it off to the core block to manage. The images will always remain in your library and on your pages.

= Your server has a max upload size of =

This warning shows when your server has a restriction lower than 10MB. Many images provided at the "full" quality are higher than this and therefore will fail when attempting to import. You should be able to contact your hosting provider to increase this value to something more reasonable like 25MB.

== Screenshots ==

1. A zoomed in view showing a search for food photos
2. The default view showing the latest photos

== Changelog ==

= 1.1.0 =
- Add e2e tests of all features
- Add missing translation functions
- Add warning when php max upload size is below 10mb
- Default to "small" size when the above is true

= 1.0.2 =
- Test and add support for WP 5.8
- Lower background opacity by 10

= 1.0.1 =
- Fix icon

= 1.0.0 =
- Initial release
