// Add mappings to any libraries you use which 'export' more than the default ('.') entry point (Jest 27 takes care of that).
//
const entries = Object.entries({

  // firebase-admin
  'firebase-admin/app': 'firebase-admin/lib/app/index.js',
  'firebase-admin/app-check': 'firebase-admin/lib/app-check/index.js',
  'firebase-admin/auth': 'firebase-admin/lib/auth/index.js',
  'firebase-admin/credential': 'firebase-admin/lib/credential/index.js',
  'firebase-admin/database': 'firebase-admin/lib/database/index.js',
  'firebase-admin/firestore': 'firebase-admin/lib/firestore/index.js',
  'firebase-admin/installations': 'firebase-admin/lib/installations/index.js',
  'firebase-admin/instance-id': 'firebase-admin/lib/instance-id/index.js',
  'firebase-admin/machine-learning': 'firebase-admin/lib/machine-learning/index.js',
  'firebase-admin/messaging': 'firebase-admin/lib/messaging/index.js',
  'firebase-admin/project-management': 'firebase-admin/lib/project-management/index.js',
  'firebase-admin/remote-config': 'firebase-admin/lib/remote-config/index.js',
  'firebase-admin/security-rules': 'firebase-admin/lib/security-rules/index.js',
  'firebase-admin/storage': 'firebase-admin/lib/storage/index.js',
  'firebase-admin/utils': 'firebase-admin/lib/utils/index.js',
}).map(([k, v]) => {
  const arr = k.match(/(.+?)/);
  // pick the node_modules name
  const name = arr[1] || fail('No \'/\' in key');
  return [k, v.replace(/^.\//, name)];
});

const lookup = new Map(entries);

const res = (request, options) => {   // (string, { ..see above.. }) => ...
  const hit = lookup.get(request);
  if (hit) {
    return options.defaultResolver(hit, options);
  } else {
    return options.defaultResolver(request, options);
  }
};

module.exports = res;
