=== Unlimited Photos - Unsplash and Lexica images ===
Contributors:      kbat82
Tags:              block, ai, stock photos, photography, news, politics, people, wallpaper, google images
Tested up to:      6.4
Stable tag:        1.5.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Search from millions of stock photos, AI-generated imagry, textures, wallpapers, and more.

== Description ==

Unlimited Photos is a Gutenberg block plugin that integrates into the core image block, providing a way to view, search, and import over 3 million free-to-use* photos, images, and digital art.

To use it, when adding a block, search for 'unlimited photos' or add an image block and press the blue camera icon.

NEW: Search for images from the media tab (WordPress 6.3+).

Looking for that stock photo that perfectly matches your recipe, blog post, or news article? Or the perfect current event pic that describes exactly the intensity your story conveys? Writing a blog post for your business? Unlimited photos has exactly what you are looking for, for free*.

Search AI-generated images built from platforms like stable diffusion, Dall-E, Midjourney, and more.

* See the FAQ section for specific license info. AI-generated images are free for personal use but may require a license for commercial use.

= More info =
- Follow [@kevinbatdorf](https://twitter.com/kevinbatdorf) on Twitter
- View on [GitHub](https://github.com/KevinBatdorf/unsplash-block-plugin)

= Features =
- Search millions of photos, AI-generated images, textures, wallpapers, and more.
- Always view the latest photos
- Your search is saved so you can always pick up where you left off.
- Import photos right into the core image block (and the media library too)
- Search anything, or select from a predefined list
- No lock-in, delete at any time and nothing changes

= Note =
- Image search uses the Unsplash AI at unsplash.com
- AI search uses the Lexica API at lexica.com

= Terms of Use & Privacy =

While using this plugin you will interact with an API at [unsplash-api-search.vercel.app](https://unsplash-api-search.vercel.app/) that returns images based on your search terms. Referral information (IP address, domain, and the content being requested) is sent to the server. No additional information is tracked.

You may audit the server code at its [GitHub repository](https://github.com/KevinBatdorf/unsplash-api).

The server is hosted on [Vercel](https://vercel.com/), and by connecting to their servers, you also agree to their [privacy policy](https://vercel.com/legal/privacy-policy) and [terms](https://vercel.com/legal/terms) as well.

[General API terms](https://unsplash-api-search.vercel.app/terms.html)

== Installation ==

1. Activate the plugin through the 'Plugins' screen in WordPress

== Frequently Asked Questions ==

= What license do the images have? =

- Unsplash images (non-AI) license information can be found here: https://unsplash.com/license
- Lexica images (AI generated) license information can be found here: https://lexica.art/license

= What happens when I deactivate this plugin? =

Nothing. We cleanly integrate into the image block, and when you import an image, we hand it off to the core block to manage. The images will always remain in your library and on your pages.

= Your server has a max upload size of =

This warning shows when your server has a restriction lower than 3MB. Many images provided at the "full" or "raw" quality are higher than this and therefore will fail when attempting to import. You should be able to contact your hosting provider to increase this value to something more reasonable like 25MB. To remove the warning, press the "Settings" button and select the "Regular" radio button to manually set the import size.

== Screenshots ==

1. An example of searching for wallpapers
2. A search for animal stock images
3. An AI search for a particular artist
4. Search and insert from the block interter media tab

== Changelog ==

= 1.5.0 - 2023-07-23 =
- Feature: Added block inserter media tab category

= 1.4.1 - 2023-05-03 =
- Tweak: Remove gradient bg colors as they don't work very wel with gaps now
- Fix: The loading text on the midnight theme is now white
- Fix: Attempt to fix first install auto inject loading

= 1.4.0 - 2023-04-23 =
- Feature: Add AI image search
- Feature: Add Recent search history
- Tweak: Change spacing between images, and a few other design tweaks
- Tweak: Removed auto fill of alt tags

= 1.3.0 - 2023-04-06 =
- Fix: Update persistent scroll bars
- Testing: Update testing strategy (on GitHub)
- API: Return results by latest upload instead of modified date as it seems some users game this otherwise

= 1.2.1 - 2022-09-17 =
- Fix: Fix color contrast on "No photos found" message
- Fix: Wait one frame before opening the modal

= 1.2.0 =
- Add settings modal
- Add setting to toggle import file size/quality
- Add two UI themes

= 1.1.2 =
- Remove testing files from release

= 1.1.1 =
- Default to regular size when server upload size is less than 3MB

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
