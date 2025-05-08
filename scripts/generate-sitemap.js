import { SitemapStream } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { parseStringPromise } from 'xml2js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to replace streamToPromise
const streamToPromise = (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString()));
  });
};

// Function to extract URLs from existing sitemap.xml
async function extractUrlsFromExistingSitemap() {
  try {
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    const xmlData = fs.readFileSync(sitemapPath, 'utf8');
    const result = await parseStringPromise(xmlData);
    
    const urls = result.urlset.url.map(item => {
      return {
        url: item.loc[0].replace('https://www.lotustradersmachinery.com', ''),
        changefreq: item.changefreq ? item.changefreq[0] : 'weekly',
        priority: item.priority ? parseFloat(item.priority[0]) : 0.6
      };
    });

    // Organize URLs by category
    const mainLinks = urls.filter(item => 
      ['/', '/contact', '/enquiry', '/categories', '/products'].includes(item.url));
    
    const categoryLinks = urls.filter(item => 
      item.url.startsWith('/categories/'));
    
    const productLinks = urls.filter(item => 
      item.url.startsWith('/products/'));
    
    return { mainLinks, categoryLinks, productLinks };
  } catch (error) {
    console.log('Error extracting URLs from sitemap:', error);
    // Return empty arrays as fallback
    return { mainLinks: [], categoryLinks: [], productLinks: [] };
  }
}

// Function to generate sitemap for different sections
async function generateSitemap() {
  try {
    // Extract URLs from existing sitemap
    const { mainLinks, categoryLinks, productLinks } = await extractUrlsFromExistingSitemap();

    // Complete list of URLs from sitemap.xml
    const fallbackMainLinks = [
      { url: '/', changefreq: 'weekly', priority: 1.0 },
      { url: '/contact', changefreq: 'monthly', priority: 0.7 },
      { url: '/enquiry', changefreq: 'monthly', priority: 0.7 },
      { url: '/categories', changefreq: 'monthly', priority: 0.8 },
      { url: '/products', changefreq: 'weekly', priority: 0.8 },
    ];

    const fallbackCategoryLinks = [
      { url: '/categories/brick_making_machine', changefreq: 'monthly', priority: 0.7 },
      { url: '/categories/concrete_mixer', changefreq: 'monthly', priority: 0.7 },
      { url: '/categories/trimix_system', changefreq: 'monthly', priority: 0.7 },
      { url: '/categories/trolley', changefreq: 'monthly', priority: 0.7 },
      { url: '/categories/moulds', changefreq: 'monthly', priority: 0.7 },
      { url: '/categories/construction_chemicals_and_colors', changefreq: 'monthly', priority: 0.7 },
      { url: '/categories/bar_bending_and_cutting_machine', changefreq: 'monthly', priority: 0.7 },
      { url: '/categories/other_machinery', changefreq: 'monthly', priority: 0.7 },
    ];

    const fallbackProductLinks = [
      // Brick Making Machine Products
      { url: '/products/manual_4_cavity_brick_making_machine', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/manual_interlocking_single_cavity_brick_making_machine', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/manual_interlocking_double_cavity_brick_making_machine', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/3_in_1_hydraulic_concrete_block_making_machine', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/semi_automatic_double_cavity_brick_block_making_machine', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/hydraulic_semi_automatic_brick_making_machine_dhokla', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/egg_laying_type_block_making_machine', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/vibration_table', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/mini_automatic_3_cavity_brick_making_machine', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/automatic_4_cavity_brick_making_machine', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/automatic_6_cavity_brick_making_machine', changefreq: 'weekly', priority: 0.6 },
      
      // Concrete Mixer Products
      { url: '/products/reversible_concrete_mixer', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/concrete_mixer_with_hopper', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/lift_concrete_mixer', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/1_bag_concrete_mixer', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/pan_mixer_machine', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/half_bag_concrete_mixer', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/trolley_concrete_mixer', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/laboratory_concrete_mixer', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/colour_mixer_pan_type', changefreq: 'weekly', priority: 0.6 },
      
      // Trimix System Products
      { url: '/products/vacuum_dewatering_pump', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/earth_compactor', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/concrete_power_trowel', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/groove_cutting_machine', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/texture_brush', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/bull_floater', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/plate_vibrator', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/double_beam_surface_vibrator', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/tamping_rammer', changefreq: 'weekly', priority: 0.6 },
      
      // Trolley Products
      { url: '/products/single_wheel_trolley', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/double_wheel_trolley', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/brick_shifting_trolley', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/hand_pallet_truck', changefreq: 'weekly', priority: 0.6 },
      
      // Moulds Products
      { url: '/products/brick_plastic_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/zig_zag_plastic_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/cosmic_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/milano_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/i_shape_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/damru_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/diamond_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/grass_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/thrihex_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/hexa_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/chatai_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/luodo_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/mosaic_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/sunflower_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/tablet_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/16_db_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/100_db_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/flower_1_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/flower_2_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/om_1_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/om_round_2_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/vg_03_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/vg_08_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/vg_14_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/vg_17_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/bb_01_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/bb_08_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/zig_zag_paver_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/diamond_paver_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/damru_paver_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/colorado_paver_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/milano_paver_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/dumble_single_set_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/dumble_single_ring_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/double_cavity_zig_zag_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/three_cavity_zig_zag_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/hexagonal_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/solid_brick_4_cavity_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/solid_brick_2_cavity_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/solid_brick_3_cavity_mould', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/solid_brick_single_cavity_mould', changefreq: 'weekly', priority: 0.6 },
      
      // Construction Chemicals and Colors Products
      { url: '/products/hardner_chemicals_chemical', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/hardner_powder_chemical', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/silicon_emulsion_chemical', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/lecquers_polish_chemical', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/iron_oxide_red_chemical', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/iron_oxide_yellow_chemical', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/iron_oxide_black_chemical', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/iron_oxide_green_chemical', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/iron_oxide_blue_chemical', changefreq: 'weekly', priority: 0.6 },
      
      // Bar Bending and Cutting Machine Products
      { url: '/products/bar_bending_machine', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/bar_cutting_machine', changefreq: 'weekly', priority: 0.6 },
      
      // Other Machinery Products
      { url: '/products/monkey_crane', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/band_saw_machine', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/grouting_pump', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/rice_mill', changefreq: 'weekly', priority: 0.6 },
      { url: '/products/demolition_hammer', changefreq: 'weekly', priority: 0.6 }
    ];

    // Use extracted URLs or fallback to hardcoded ones if empty
    const links = [
      ...(mainLinks.length ? mainLinks : fallbackMainLinks),
      ...(categoryLinks.length ? categoryLinks : fallbackCategoryLinks),
      ...(productLinks.length ? productLinks : fallbackProductLinks)
    ];

    // Create a stream to write to
    const stream = new SitemapStream({ hostname: 'https://www.lotustradersmachinery.com' });

    // Return a promise that resolves with your XML string
    const data = await streamToPromise(Readable.from(links).pipe(stream));
    
    // Write the XML to file
    fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), data.toString());
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.log('Error generating sitemap:', error);
  }
}

// Run the function
generateSitemap();
